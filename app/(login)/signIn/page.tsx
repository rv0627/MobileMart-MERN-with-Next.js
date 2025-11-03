import UserLoginForm from "@/app/(component)/userLoginForm";
import styles from "../login.module.css";


export default function SignIn() {
  
  return (
    <main className={styles.bgImage}>
      <div className="flex items-center justify-center min-h-screen px-4 py-2 font-sans text-gray-700">
        <div className="w-full max-w-md">
          <div className="bg-blue-200/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg">
            <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-black text-center mb-6">
              Welcome Back
            </h1>
            <UserLoginForm/>
          </div>
        </div>
      </div>
    </main>
  );
}
