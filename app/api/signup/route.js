// app/api/signup/route.js
import prisma from '../../../prisma/prisma';  
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { fullName, email, password, role } = await req.json();

  console.log('Received data:', { fullName, role, email, password,  });

  // Basic validation
  if (!fullName || !email || !password || !role) {
    return new Response('All fields are required', { status: 400 });
  }

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.newUser.create({
      data: {
        fullName,
        role,
        email,
        password: hashedPassword,  
       
      },
    });
    console.log(newUser);
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response('user Created Successfully', { status: 500 });
  }
  
}
