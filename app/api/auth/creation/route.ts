import prisma from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

// FETCH USER FROM DB, IF USER DOES NOT EXIST, CREAT USER WITH DATA FROM KINDE IF USER EXIST IN KINDE
export async function GET() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user || user===null || !user.id) {
        throw new Error("Something went wrong")
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })
    
    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
        })
    }

    return NextResponse.redirect("http://localhost:3000/dashboard")
}