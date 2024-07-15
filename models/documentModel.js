import mongoose from 'mongoose';
import { DOCUMENT_STATE } from '../enums/documentStates.js';
const versionSchema = new mongoose.Schema({
    content: { type: String, required: true },
},{
    timestamps:true
});

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    state: { type: String, enum:Object.values(DOCUMENT_STATE), default: DOCUMENT_STATE.DRAFT },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    versions: [versionSchema]
},{
    timestamps:true
});

const Document = mongoose.model('Document', documentSchema);
export default Document;