import { useEffect } from "react"

const useSEO = (title, description) => {

    useEffect(() => {
        document.title = title;
        document.querySelector('meta[name="description"]')?.setAttribute("content", description)

    }, [title, description])
}

export {
    useSEO
}


