import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'premium';
  tokenVersion: number;
  subscription: {
    plan: 'free' | 'pro' | 'team' | 'scale' | 'enterprise';
    status: 'active' | 'inactive' | 'cancelled';
    startDate: Date;
    endDate?: Date;
    apiCallsUsed: number;
    apiCallsLimit: number;
    reportsUsed: number;
    reportsLimit: number;
  };
  profile: {
    company?: string;
    industry?: string;
    useCase?: string;
    phone?: string;
    avatar?: string;
  };
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
  };
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'premium'],
    default: 'user',
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'pro', 'team', 'scale', 'enterprise'],
      default: 'free',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: Date,
    apiCallsUsed: {
      type: Number,
      default: 0,
    },
    apiCallsLimit: {
      type: Number,
      default: 500, // Free plan limit
    },
    reportsUsed: {
      type: Number,
      default: 0,
    },
    reportsLimit: {
      type: Number,
      default: 1, // Free plan limit
    },
  },
  profile: {
    company: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    useCase: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true,
    },
    emailUpdates: {
      type: Boolean,
      default: true,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
}, {
  timestamps: true,
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update API call limits based on subscription plan
UserSchema.methods.updateSubscriptionLimits = function () {
  const limits = {
    free: { apiCalls: 500, reports: 1 },
    pro: { apiCalls: 100000, reports: 5 },
    team: { apiCalls: 1000000, reports: 20 },
    scale: { apiCalls: 5000000, reports: -1 }, // -1 means unlimited
    enterprise: { apiCalls: -1, reports: -1 },
  };

  const planLimits = limits[this.subscription.plan as keyof typeof limits];
  this.subscription.apiCallsLimit = planLimits.apiCalls;
  this.subscription.reportsLimit = planLimits.reports;
};

export const User = mongoose.model<IUser>('User', UserSchema);
