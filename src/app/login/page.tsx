"use client";

import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 rounded-lg">
        <SignIn path="/login" routing="path" />
      </div>
    </div>
  );
};

export default LoginPage;
