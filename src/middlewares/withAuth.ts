import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  NextMiddleware,
} from "next/server";

const onlyAdmin = ["admin"];
const authPage = ["auth"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // jika tidak ada token dan tidak ada halaman auth pindahkan ke halaman login
      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        // set callbackUrl ke url login
        return NextResponse.redirect(url); // redirect ke url login jika tidak ada token
      }

      // kalau ada token
      if (token) {
        if (authPage.includes(pathname)) {
          // jika halaman auth masih ada dalam requireAuth maka pindahkan ke halaman index
          return NextResponse.redirect(new URL("/", req.url));
        }

        // kalau dia role nya bukan admin arahkan ke halaman index
        if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }
    return middleware(req, next);
  };
}
