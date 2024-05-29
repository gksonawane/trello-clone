// import {clerkMiddleware, createRouteMatcher, auth} from '@clerk/nextjs/server'
// import {NextResponse} from "next/server";
// import {useAuth} from "@clerk/nextjs";
// import * as url from "node:url";
//
// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)','/(.*)']);
//
// export default clerkMiddleware((auth, request) => {
//    const { userId } = auth() ;
//     if(!isPublicRoute(request)) {
//         auth().protect();
//     }
//
//     if( userId && isPublicRoute(request) ){
//         let path = "/select-org";
//
//         if(request.cookies.get('_org_id')){
//             path = `/organization/${request.cookies.get('_org_id')}`;
//         }
//         const selectedOrg = new URL(path , request.url);
//         return NextResponse.redirect(selectedOrg);
//     }
//
//     if (!isPublicRoute(request)) {
//         // Protect the route if the user is not authenticated
//         if (!userId) {
//             const signInUrl = new URL('/sign-in', request.url)
//             return NextResponse.redirect(signInUrl)
//         }
//         // Allow authenticated users to access the protected route
//         return { response: null }
//     }
//
//    if( userId && !request.cookies.get('_org_id') && request.nextUrl.pathname !== "/select-org"){
//        const  selectedOrg = new URL("/select-org",request.url);
//        return NextResponse.redirect(selectedOrg);
//    }
//
// });
//
// export const config = {
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// }

import {clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import * as url from 'node:url';
import {id} from "postcss-selector-parser";

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/public(.*)']);

export default clerkMiddleware((auth, request) => {
    const { userId, orgId } = auth();

    const requestUrl = new URL(request.url);

    if(!isPublicRoute(request)) {
        auth().protect();
    }

    // Redirect authenticated users on public routes to select organization if they don't have an org ID
    if (userId && isPublicRoute(request)) {
        let path = '/select-org';

        if (orgId) {
            path = `/organization/${orgId}`;
        }




        const redirectTo = new URL(path, request.url);
        return NextResponse.redirect(redirectTo);
    }

    // Protect private routes
    if (!isPublicRoute(request)) {
        // Redirect unauthenticated users to sign-in
        if (!userId) {
            const signInUrl = new URL('/sign-in', request.url);
            return NextResponse.redirect(signInUrl);
        }

        // Redirect authenticated users without org ID to select organization
        if (userId && !orgId && requestUrl.pathname !== '/select-org') {
            const selectOrgUrl = new URL('/select-org', request.url);
            return NextResponse.redirect(selectOrgUrl);
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
