import mongoose, { Document, Schema } from 'mongoose';

export interface ISimulation extends Document {
  name: string;
  description: string;
  project: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  type: 'trading' | 'settlement' | 'compliance' | 'risk' | 'portfolio';
  status: 'draft' | 'running' | 'completed' | 'failed' | 'cancelled';
  configuration: {
    assets: Array<{
      symbol: string;
      type: 'equity' | 'bond' | 'commodity' | 'crypto' | 'derivative';
      quantity: number;
      price: number;
      metadata?: any;
    }>;
    parameters: {
      startDate: Date;
      endDate?: Date;
      timeHorizon: number; // in days
      riskTolerance: 'low' | 'medium' | 'high';
      complianceRules: string[];
      settlementType: 'T+0' | 'T+1' | 'T+2' | 'T+3';
    };
    marketConditions: {
      volatility: number;
      liquidity: 'low' | 'medium' | 'high';
      marketRegime: 'bull' | 'bear' | 'sideways';
    };
  };
  results: {
    executionTime: number; // in milliseconds
    totalTrades: number;
    successfulTrades: number;
    failedTrades: number;
    complianceViolations: Array<{
      rule: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
      timestamp: Date;
    }>;
    performance: {
      totalReturn: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
      winRate: number;
    };
    riskMetrics: {
      var95: number; // Value at Risk 95%
      var99: number; // Value at Risk 99%
      expectedShortfall: number;
      stressTestResults: any;
    };
    auditTrail: Array<{
      action: string;
      timestamp: Date;
      details: any;
      userId: mongoose.Types.ObjectId;
    }>;
  };
  metadata: {
    tags: string[];
    version: string;
    parentSimulation?: mongoose.Types.ObjectId;
    isTemplate: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

const SimulationSchema = new Schema<ISimulation>({
  name: {
    type: String,
    required: [true, 'Please add a simulation name'],
    trim: true,
    maxlength: [100, 'Simulation name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['trading', 'settlement', 'compliance', 'risk', 'portfolio'],
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'running', 'completed', 'failed', 'cancelled'],
    default: 'draft',
  },
  configuration: {
    assets: [{
      symbol: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['equity', 'bond', 'commodity', 'crypto', 'derivative'],
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      metadata: {
        type: Schema.Types.Mixed,
      },
    }],
    parameters: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: Date,
      timeHorizon: {
        type: Number,
        required: true,
        min: 1,
      },
      riskTolerance: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
      complianceRules: [{
        type: String,
      }],
      settlementType: {
        type: String,
        enum: ['T+0', 'T+1', 'T+2', 'T+3'],
        default: 'T+2',
      },
    },
    marketConditions: {
      volatility: {
        type: Number,
        min: 0,
        max: 1,
        default: 0.2,
      },
      liquidity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
      marketRegime: {
        type: String,
        enum: ['bull', 'bear', 'sideways'],
        default: 'sideways',
      },
    },
  },
  results: {
    executionTime: {
      type: Number,
      default: 0,
    },
    totalTrades: {
      type: Number,
      default: 0,
    },
    successfulTrades: {
      type: Number,
      default: 0,
    },
    failedTrades: {
      type: Number,
      default: 0,
    },
    complianceViolations: [{
      rule: {
        type: String,
        required: true,
      },
      severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
    performance: {
      totalReturn: {
        type: Number,
        default: 0,
      },
      volatility: {
        type: Number,
        default: 0,
      },
      sharpeRatio: {
        type: Number,
        default: 0,
      },
      maxDrawdown: {
        type: Number,
        default: 0,
      },
      winRate: {
        type: Number,
        default: 0,
      },
    },
    riskMetrics: {
      var95: {
        type: Number,
        default: 0,
      },
      var99: {
        type: Number,
        default: 0,
      },
      expectedShortfall: {
        type: Number,
        default: 0,
      },
      stressTestResults: {
        type: Schema.Types.Mixed,
      },
    },
    auditTrail: [{
      action: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      details: {
        type: Schema.Types.Mixed,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    }],
  },
  metadata: {
    tags: [{
      type: String,
      trim: true,
    }],
    version: {
      type: String,
      default: '1.0.0',
    },
    parentSimulation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Simulation',
    },
    isTemplate: {
      type: Boolean,
      default: false,
    },
  },
  completedAt: Date,
}, {
  timestamps: true,
});

// Indexes for efficient queries
SimulationSchema.index({ project: 1, status: 1 });
SimulationSchema.index({ owner: 1, type: 1 });
SimulationSchema.index({ 'metadata.tags': 1 });
SimulationSchema.index({ createdAt: -1 });

export const Simulation = mongoose.model<ISimulation>('Simulation', SimulationSchema);






