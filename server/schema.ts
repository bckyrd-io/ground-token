import mongoose, { Schema, Document } from 'mongoose';

// Playground Schema
interface IPlayground extends Document {
  name: string;
  description: string;
  location: { latitude: string; longitude: string };
  image: string;
}

const PlaygroundSchema = new Schema<IPlayground>({
    name: { type: String, required: true },
    description: { type: String },
    location: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    image: { type: String }, // Add this field for storing image paths
  });  

export const Playground = mongoose.model<IPlayground>('Playground', PlaygroundSchema);

// User Schema
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  whatsapp?: string;
  address?: string;
  agreeToTerms?: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  whatsapp: { type: String },
  address: { type: String },
  agreeToTerms: { type: Boolean, default: false },
});

export const User = mongoose.model<IUser>('User', UserSchema);

// Payment Schema
interface IPayment extends Document {
  method: string;
  amount: number;
  status: string;
  timestamp: Date;
}

const PaymentSchema = new Schema<IPayment>({
  method: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  timestamp: { type: Date, default: Date.now },
});

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
