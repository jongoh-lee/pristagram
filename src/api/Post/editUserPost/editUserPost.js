import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";

export default {
  Mutation: {
    editUserPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId, tasting, editFiles, createFiles, deleteFiles, action } = args;
      if(action === DELETE){
        return await prisma.updateUser({
          where: { id: user.id },
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
        return await prisma.updateUser({
          where: { id: user.id },
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