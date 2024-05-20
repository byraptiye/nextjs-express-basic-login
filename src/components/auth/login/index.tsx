'use client'
import { Logo } from "@/components/layout/logo"
import { AuthServices } from "@/services/auth"
import { Input, Button, Checkbox, Divider, Tooltip } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FiAlertCircle } from "react-icons/fi";
import Cookie from 'js-cookie'

type LoginFormInputs = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<LoginFormInputs>()
    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsLoading(true)
        AuthServices.Login({ ...data })
            .then((response) => {
                const { data } = response.data
                //This data variable is jwt token.
                Cookie.remove('piirJTW')
                Cookie.set('piirJWT', data)
                router.replace('/dashboard')
            })
            .catch((error) => {
                const { errorField, requestMessage } = error.response.data
                setError(errorField, { message: requestMessage }, { shouldFocus: true })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full py-10 rounded-xl border shadow-lg bg-white px-5">
            <div className="mb-3">
                <Logo />
            </div>
            <div className="gap-5 flex flex-col">
                <Input
                    isRequired
                    isInvalid={errors.email ? true : false}
                    variant="bordered"
                    label="Email"
                    placeholder="Lütfen bir email adresi giriniz."
                    autoComplete="off"
                    type="email"
                    {...register('email', { required: true })}
                    endContent={
                        errors.email ? <Tooltip color="danger" content={errors.email ? errors.email.message : ''}>
                            <span className="hover:cursor-pointer">
                                <FiAlertCircle color="red" />
                            </span>
                        </Tooltip> : <></>
                    }
                />
                <Input
                    isRequired
                    isInvalid={errors.password ? true : false}
                    variant="bordered"
                    label="Şifre"
                    placeholder="Lütfen bir şifre giriniz."
                    type="password" {...register('password', { required: true, minLength: 8 })}
                    endContent={
                        errors.password ? <Tooltip color="danger" content={errors.password ? errors.password.message : ''}>
                            <span className="hover:cursor-pointer">
                                <FiAlertCircle color="red" />
                            </span>
                        </Tooltip> : <></>
                    }
                />
            </div>
            <div className="flex w-full justify-between items-start">
                <Checkbox {...register('rememberMe')}>
                    <span className="text-sm text-slate-600">Beni Hatırla?</span>
                </Checkbox>
                <a className="text-sm text-slate-400" href="#">Şifremi unuttum</a>
            </div>
            <div>
                <Button isLoading={isLoading} color="primary" type="submit">Giriş yap</Button>
            </div>
            <Divider />
            <div className="text-center">
                <span className="text-sm text-slate-600">Henüz bir hesabınız yok mu? <a href="#" className="text-blue-600">Üye olmak için tıklayın.</a></span>
            </div>
        </form>
    )
}
