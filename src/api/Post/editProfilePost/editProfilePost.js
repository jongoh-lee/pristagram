import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";

export default {
  Mutation: {
    editProfilePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { profileId, postId, tasting, editFiles, createFiles, deleteFiles, action } = args;
      if(action === DELETE){
        return await prisma.updateProfile({
          where: { id: profileId },
          data:{
              posts:{
                  delete: { id: postId }
              }
            }
        });
      }else{
        let _editFiles = editFiles.map(el => (
          {
            data: { url: el.url },
            where:{ id: el.id }
          }
        ));
        return await prisma.updateProfile({
          where: { id: profileId },
          data: {
            tasting,
            posts:{
              updateMany: _editFiles,
              create: createFiles,
              deleteMany: deleteFiles,
              where:{
                id: postId
              }
            },
          }
        });
      }
    }
  }
};