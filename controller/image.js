import { PrismaClient } from '@prisma/client';
import imagekit from '../libs/imagekit.js';

const prisma = new PrismaClient();

export const uploadImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const stringFile = req.file.buffer.toString('base64');
    const data = await imagekit.upload({
      fileName: req.file.originalname,
      file: stringFile,
    });

    const content = await prisma.image.create({
      data: {
        title,
        description,
        imageFieldId: data.fileId,
        profileImageUrl: data.url,
      },
    });

    res.status(201).json({
      status: 201,
      message: 'success',
      data: content,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await prisma.image.findMany();
    res.status(200).json({
      status: 200,
      message: 'success',
      data: images,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

export const getImageDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await prisma.image.findUnique({
      where: { id: Number(id) },
    });

    if (!image) {
      return res.status(404).json({
        status: 404,
        message: 'Image not found',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'success',
      data: image,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await prisma.image.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    await imagekit.deleteFile(image.imageFieldId);

    await prisma.image.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      status: 200,
      message: 'Image deleted successfully',
      data: null,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const currentImage = await prisma.image.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!currentImage) {
      return res.status(404).json({
        status: 404,
        message: 'Image not found',
        data: null,
      });
    }

    let updatedData = { title, description };

    if (req.file) {
      await imagekit.deleteFile(currentImage.imageFieldId);

      const stringFile = req.file.buffer.toString('base64');

      const newImage = await imagekit.upload({
        fileName: req.file.originalname,
        file: stringFile,
      });

      updatedData.imageFieldId = newImage.fileId;
      updatedData.profileImageUrl = newImage.url;
    }

    const image = await prisma.image.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).json({
      status: 200,
      message: 'Image details updated successfully',
      data: image,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};
