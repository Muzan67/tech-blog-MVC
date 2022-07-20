const router = require("express").Router();
const Sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");
