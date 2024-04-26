
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <header className='bg-blue-800'>
                <div className='mx-auto py-10 max-w-6xl'>
                    <h1 className='text-4xl font-extrabold text-white'>
                        Products Administrator
                    </h1>
                </div>
            </header>

            <main className='mt-10 max-w-6xl p-10 bg-white shadow mx-auto'>
                <Outlet />
            </main>

        </>

    )
}
