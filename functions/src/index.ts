import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { UserRecord } from "firebase-functions/v1/auth";

import * as clientAuth from "firebase/auth";
import * as clientApp from "firebase/app";

admin.initializeApp();
const adminAuth = admin.auth();

/**
 * The onFirebaseUserCreation is triggered whenever an Auth user is created. If
 * the user does have an email and adress and it is unverified, it send the verification
 * email.
 */
export const sendVerificationEmailOnSignup = functions.auth
  .user()
  .onCreate(async (user: UserRecord, context: functions.EventContext) => {
    // Do nothing if user email is not defined or is already verified (Google sign in, email link)
    if (user.emailVerified || user.email == undefined) {
      return;
    }

    const apiKey = process.env.WEB_API_KEY;
    const options: clientApp.FirebaseOptions = { apiKey };

    // Initialize the client app with client auth
    const app = clientApp.initializeApp(options);
    const fbClientAuth = clientAuth.getAuth(app);

    try {
      // Create a new Firebase JWT for signing in
      const token = await adminAuth.createCustomToken(user.uid);
      const result = await clientAuth.signInWithCustomToken(
        fbClientAuth,
        token
      );

      // Send email verification
      await clientAuth.sendEmailVerification(result.user);

      // Sign out the current user
      await fbClientAuth.signOut();
    } catch (error) {
      functions.logger.error(error);
    }
  });
