export default function Wrapper({children}:{children:React.ReactNode}) {
    return (
        <div className="mx-auto w-full max-w-[1200px] px-3">
            {children}
        </div>
    )
}