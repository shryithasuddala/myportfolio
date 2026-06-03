const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never returned in queries by default
    },
    avatar: {
      type: String,
      default: '',
    },
    profile: {
      age: { type: Number, default: null },
      gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
      heightCm: { type: Number, default: null },
      weightKg: { type: Number, default: null },
      fitnessGoal: {
        type: String,
        enum: ['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'general_fitness', ''],
        default: '',
      },
      activityLevel: {
        type: String,
        enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', ''],
        default: '',
      },
      dietaryPreference: {
        type: String,
        enum: ['none', 'vegetarian', 'vegan', 'keto', 'paleo', ''],
        default: 'none',
      },
    },
    stats: {
      streakDays: { type: Number, default: 0 },
      totalWorkouts: { type: Number, default: 0 },
      totalCaloriesBurned: { type: Number, default: 0 },
      lastWorkoutDate: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare plain password with hashed
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual: BMI
userSchema.virtual('bmi').get(function () {
  const { heightCm, weightKg } = this.profile;
  if (!heightCm || !weightKg) return null;
  const heightM = heightCm / 100;
  return (weightKg / (heightM * heightM)).toFixed(1);
});

module.exports = mongoose.model('User', userSchema);
