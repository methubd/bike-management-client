import { RouterType } from "react-router-dom";

declare module "./router.jsx" {
    const router: RouterType;
    export { router };
}
