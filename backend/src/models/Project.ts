import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  type: 'sandbox' | 'portfolio' | 'compliance' | 'research';
  status: 'active' | 'archived' | 'deleted';
  settings: {
    isPublic: boolean;
    allowCollaboration: boolean;
    defaultCurrency: string;
    timezone: string;
  };
  metadata: {
    tags: string[];
    industry?: string;
    useCase?: string;
    complexity: 'beginner' | 'intermediate' | 'advanced';
  };
  statistics: {
    simulationsRun: number;
    lastActivity: Date;
    totalApiCalls: number;
    collaborators: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true,
    maxlength: [100, 'Project name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['sandbox', 'portfolio', 'compliance', 'research'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'deleted'],
    default: 'active',
  },
  settings: {
    isPublic: {
      type: Boolean,
      default: false,
    },
    allowCollaboration: {
      type: Boolean,
      default: false,
    },
    defaultCurrency: {
      type: String,
      default: 'USD',
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
  },
  metadata: {
    tags: [{
      type: String,
      trim: true,
    }],
    industry: {
      type: String,
      trim: true,
    },
    useCase: {
      type: String,
      trim: true,
    },
    complexity: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  statistics: {
    simulationsRun: {
      type: Number,
      default: 0,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    totalApiCalls: {
      type: Number,
      default: 0,
    },
    collaborators: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
});

// Index for efficient queries
ProjectSchema.index({ owner: 1, status: 1 });
ProjectSchema.index({ type: 1, status: 1 });
ProjectSchema.index({ 'metadata.tags': 1 });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);






