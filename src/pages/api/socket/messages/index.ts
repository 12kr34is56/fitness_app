import { db } from "@/core/client/client";
import { NextApiResponseServerIo } from "@/resource/types/types";
import { NextApiRequest } from "next";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
){
  try {
    const { to, text, subject, session } = await req.body;
    console.log(to, text, subject, session)
    if (!session?.user?.email) {
      return res.json({ error: "Unauthorized" , session:session}, { status: 401 });
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    
    const reciever = await db.user.findUnique({
      where: {
        email: to as string,
      },
    });

    if (!currentUser || !reciever ) {
      return res.json({ error: "Unauthorized" }, { status: 401 });
    }

    // if (reciever?.role !== 'TRAINER') {
    //   return res.status(403).json({ error: 'Trainer email does not exists.' });
    // }

    // if (currentUser?.role === 'USER') {

    //   // Check if the user has already initiated a conversation
    //   const existingConversation = await db.conversation.findFirst({
    //     where: {
    //       participant1Id: currentUser.id,
    //     },
    //   });

    //   if (existingConversation) {
    //     return res.status(403).json({ error: 'You can only connect with one trainer at a time.' });
    //   }
    // }

    // Validate required fields
    if (!to || !text) {
      return res.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find or create conversation between currentUser and receiver
    let conversation = await db.conversation.findFirst({
      where: {
        OR: [
          {
            participant1Id: currentUser.id,
            participant2Id: reciever.id,
          },
          {
            participant1Id: reciever.id,
            participant2Id: currentUser.id,
          },
        ],
      },
    });

    if (!conversation) {
      // If conversation doesn't exist, create a new one
      conversation = await db.conversation.create({
        data: {
          participant1Id: currentUser.id,
          participant2Id: reciever.id,
        },
      });
    }

    // Create the new message within the found or created conversation
    const newMessage = await db.message.create({
      data: {
        from: currentUser.email,
        to,
        subject,
        message:text,
        userId: currentUser.id,
        conversationId: conversation.id,
      },
      include: {
        User: true, // Include user details
      },
    });

    const channelKey= `chat:${conversation.id}`;
    console.log(channelKey);
    res?.socket?.server?.io?.emit(channelKey,newMessage);

      return res.status(200).json(text);

    }
    catch(error)
    {
        console.log("[DIRECT_MESSGAE_POST]",error);
        return res.status(500).json({error: "Internal error"});
    }

}




// import { db } from "@/lib/db";
// import { getCurrentUser } from "@/lib/getCurrentUser";
// import { NextResponse } from "next/server";

// export async function POST(
//     request: Request
// ){
//     try{
//         const currentUser=await getCurrentUser();
//         const body= await request.json();
//         const {
//             message,image,conversationId
//         }= body;

//         if(!currentUser?.id || !currentUser?.email)
//         {
//             return new NextResponse("unauthoried" , {status: 401});
//         }

//         const newMessage=await db.message.create({
//             data:{
//                 body: message,
//                 image:image,
//                 conversation:{
//                     connect:{
//                         id:conversationId,
//                     }
//                 },
//                 sender:{
//                     connect:{
//                         id: currentUser.id
//                     }
//                 },
//                 seen:{
//                     connect:{
//                         id: currentUser.id
//                     }
//                 }
//             },
//             include:{
//                 seen:true,
//                 sender:true,
//             }
//         })

//         const updatedConversation = await db.conversation.update({
//             where:{
//                 id:conversationId
//             },
//             data:{
//                 lastMessageAt: new Date(),
//                 messages:{
//                     connect:{
//                         id: newMessage.id
//                     }
//                 }
//             },
//             include:{
//                 users:true,
//                 messages:{
//                     include:{
//                         seen:true,
//                     }
//                 }
//             }
            
//         })

//         return NextResponse.json(newMessage);

//     }   
//     catch(error){
//         return new NextResponse("Internal errror" , {status: 500});
//     }
// }