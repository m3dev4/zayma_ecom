import asyncHandler from "../middlewares/asyncHandler.js";
import prisma from "../utils/db.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { nom, prenom, email, password } = req.body;

  console.log(req.body);
  if (!nom || !prenom || !email || !password) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  // Vérifier si l'utilisateur existe
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const verificationToken = crypto.randomBytes(20).toString("hex");
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); //24h

  // Créer l'utilisateur
  const user = await prisma.user.create({
    data: {
      nom,
      prenom,
      email,
      password: hashedPassword,
      role: "BUYER",
      isVerified: false,
      verifyToken: verificationToken,
      verifyTokenExpire: verificationExpires,
    },
  });

  createToken(res, user);

  if (user) {
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;

    await sendEmail({
      email: user.email,
      subject: "Email Verification",
      html: `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationUrl}">Verify Email</a>
      `,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully, please verify your email",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    // Créer une session
    await prisma.session.create({
      data: {
        userId: userExists.id,
        ip: req.ip,
        userAgent: req.headers["user-agent"] || null,
        device: req.headers["sec-ch-ua-platform"] || null,
        lastActive: new Date(),
      },
    });

    if (!userExists) {
      res.status(404).send("User not found");
    }

    // Mettre à jour lastLogin
    await prisma.user.update({
      where: { id: userExists.id },
      data: { lastLogin: new Date() },
    });

    const token = createToken(res, userExists);
    console.log("Cookies après connexion:", req.cookies);

    res.json({
      id: userExists.id,
      nom: userExists.nom,
      prenom: userExists.prenom,
      email: userExists.email,
      role: userExists.role,
      isAdmin: userExists.isAdmin,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).send("User not found");
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;
    const message = `Vous avez oublié votre mot de passe ? Cliquez sur le lien suivant pour le réinitialiser : ${resetUrl}`;
    //send mail
    await sendEmail({
      email: user.email,
      subject: "Mot de passe oublié",
      html: message,
    });
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

 const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hasher le token reçu pour le comparer avec celui stocké
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)  // Corrigé de 'upadte' à 'update'
      .digest('hex');

    // Chercher l'utilisateur avec le token hashé
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken,
        resetPasswordExpire: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      res.status(400);
      throw new Error('Token invalide ou expiré');
    }

    // Hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Mettre à jour l'utilisateur
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpire: null
      }
    });

    res.status(200).json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès'
    });

  } catch (error) {
    console.error(error);
    res.status(400);
    throw new Error('Erreur lors de la réinitialisation du mot de passe');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      nom: true,
      prenom: true,
      email: true,
      role: true,
      isAdmin: true,
      isVerified: true,
      lastLogin: true,
    },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immédiatement
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Déconnexion réussie",
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      nom: req.body.nom || undefined,
      prenom: req.body.prenom || undefined,
      email: req.body.email || undefined,
      ...(req.body.password && {
        password: await bcrypt.hash(req.body.password, 10),
      }),
    },
  });

  res.json({
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    role: user.role,
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nom: true,
      prenom: true,
      email: true,
      role: true,
      isAdmin: true,
      isVerified: true,
      lastLogin: true,
      sessions: true,
    },
  });
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: {
      id: true,
      nom: true,
      prenom: true,
      email: true,
      role: true,
      isAdmin: true,
      isVerified: true,
      lastLogin: true,
      sessions: true,
    },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.delete({
    where: { id: req.params.id },
  });

  if (user) {
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const user = await prisma.user.findFirst({
    where: {
      verifyToken: token,
      verifyTokenExpire: {
        gt: new Date(),
      },
    },
  });
  if (!user) {
    res.status(400);
    throw new Error("Invalid token");
  }
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpire: null,
      },
    });
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  resetPassword,
  forgotPassword,
  verifyEmail,
};
