import express from 'express';
import Document from '../models/documentModel.js'
const router = express.Router();

export const createDocument=async(req,res)=>{
    try{
        const { title, content } = req.body;
        const document = new Document({
            title,
            content,
            created_by: req.user,
            versions: [{ content }]
        });
        await document.save();
        res.status(201).json(document);
    }catch(err){
        res.status(500).json(err);
    }
};

export const getDocument=async(req,res)=>{
    try{
        const{documentId} = req.params;
        const document = await Document.findById(documentId).populate('created_by');
        if (!document) return res.status(404).send('Document not found');
        res.status(200).json(document);
    }catch(err){
       res.status(500).json(err);
    }
};

export const updateDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const { content, title } = req.body;
        const document = await Document.findById(documentId);
        if (!document) return res.status(404).send('Document not found');
        if (!document.created_by.equals(req.user)) return res.status(403).send('Forbidden');
        if (content) {
            document.content = content;
            document.versions.push({ content });
        }
        if (title) document.title = title;
        await document.save();
        res.status(200).json(document);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const deleteDocument=async(req,res)=> {
    try{
        const{documentId} = req.params;
        const document = await Document.findByIdAndDelete(documentId);
        if (!document) return res.status(404).send('Document not found');
        if (!document.created_by.equals(req.user)) return res.status(403).send('Forbidden');
        res.status(201).send('Document deleted');
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};
export const revertDocument= async (req, res) => {
    try{
        const {documentId, versionId} = req.params;
        const document = await Document.findById(documentId);
        if (!document) return res.status(404).send('Document not found');
        if (!document.created_by.equals(req.user)) return res.status(403).send('Forbidden');
        const version = document.versions.id(versionId);
        if (!version) return res.status(404).send('Version not found');
        document.content = version.content;
        document.versions.push({ content: version.content });
        await document.save();
        res.status(200).json(document);
    }catch(err){
        res.status(500).json(err);
    }
};

export default router;
