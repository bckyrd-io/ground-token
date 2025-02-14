import mongoose, { Schema, Document } from 'mongoose';


// Playground Schema
interface IPlayground extends Document {
    name: string;
    description: string;
    location: { latitude: string; longitude: string };
    image: string;
    bookingPrice: number; // Added booking price field
    status: 'Available' | 'Occupied'; // Added status field
}

const PlaygroundSchema = new Schema<IPlayground>({
    name: { type: String, required: true },
    description: { type: String },
    location: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
    },
    image: { type: String },
    bookingPrice: { type: Number, required: true }, // Ensure this field is populated
    status: { type: String, enum: ['Available', 'Occupied'], default: 'Available' }, // Ensure this field is populated
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

// Notification Schema
interface INotification extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    message: string;
    type: 'info' | 'warning' | 'alert'; // Notification types
    timestamp: Date;
    read: boolean;
}

const NotificationSchema = new Schema<INotification>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'warning', 'alert'], default: 'info' },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

