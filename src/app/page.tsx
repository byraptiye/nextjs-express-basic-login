import { LoginForm } from "@/components/auth/login";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  const cookieStore = cookies()
  const isLogged = cookieStore.has('piirJWT')
  if (isLogged) {
    redirect('/dashboard')
  }
  return (
    <main className="h-screen w-screen">
      <div className="flex container mx-auto">
        <div className="h-screen w-1/3 px-5">
          <div className="h-full flex flex-col justify-center items-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
