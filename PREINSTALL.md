Use this extension to send verification emails to new users.

## Before starting

This extension requires a certificate of [the service account](https://firebase.google.com/support/guides/service-accounts). To generate it go to **Firebase Console** > **Your Project** > **Project Settings** > **Service Accounts** and click the **Generate new private key** button.

Your service account must have the **Service Account Token Creator** role. This extension needs it to issue [custom tokens](https://firebase.google.com/docs/auth/admin/create-custom-tokens).

During the installation process the installer will ask you about the certificate. Before you answer, you need to convert the certificate to extension variables. There is an online converter that automates this process.

- [🛠 Open Service Account Converter](https://moralisweb3.github.io/firebase-extensions/service-account-converter/)

This extension listens to Auth onCreate event and send a verification email to the user
if their email address is not verified.
