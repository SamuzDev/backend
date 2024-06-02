import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
    // user_id: mongoose.Schema.Types.ObjectId;
    content: string;
    image?: string;
}

const PostSchema: Schema = new Schema({
    // user_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model<IPost>("Post", PostSchema);