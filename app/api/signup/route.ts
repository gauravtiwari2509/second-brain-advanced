import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
export async function POST(req: NextRequest) {
  console.log("Request Body:", req.body);
  try {
    const body = await req.json();
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }
    console.log("Username:", username);
    console.log("Username:", password);
    //connect to database
    await dbConnect();
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists." },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
    });
    console.log(newUser);
    return NextResponse.json(
      {
        message: "User created successfully.",
        user: { id: newUser.id, username: newUser.username },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error during signup:", error);
    return NextResponse.json(
      { error: "An error occurred during signup. Please try again later." },
      { status: 500 }
    );
  }
}
