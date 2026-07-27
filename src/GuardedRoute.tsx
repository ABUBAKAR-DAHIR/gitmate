import { Navigate } from "react-router-dom";
import { useProfile } from "./hooks/use-profile";
import { toast } from "sonner";

const GuardedRoute = () => {
    const isProfile = useProfile()

    if (isProfile === true) return null
    else {
        toast.info("Please create your profile first");
        return <Navigate to="/details"/>
    }
}

export default GuardedRoute;