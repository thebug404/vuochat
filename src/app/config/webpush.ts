// Import modules
import _webpush from "web-push";

// Import environments
import { environments } from "./environments";

const config = _webpush.setVapidDetails(
     "mailto:ivanzaldivar16@gmail.com",
     environments.WEBPUSH_PUBLIC_KEY as string,
     environments.WEBPUSH_PRIVATE_KEY as string
);

export const webpush = _webpush;
