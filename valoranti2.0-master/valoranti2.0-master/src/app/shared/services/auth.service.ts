import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Eingeloggte Benutzerdaten speichern
  constructor(
    public afs: AngularFirestore, // Injizierung der Firestore
    public afAuth: AngularFireAuth, // Injizierung der Service mit Firebase
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Speichern von Benutzerdaten im lokalen Speicher, wenn
    angemeldet und beim Abmelden null einrichten */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Einloggen mit Email/Passwort
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Einloggen mit Email/Passwort
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Rufen Sie die Funktion SendVerificaitonMail() auf, wenn sich ein neuer Benutzer anmeldet
        und returns Promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Senden einer E-Mail-Bestätigung, wenn sich ein neuer Benutzer anmeldet
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Passwort vergessen zurücksetzen
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true wenn der Benutzer eingeloggt ist und die E-Mail verifiziert ist
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Anmelden mit Google
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }
  // Auth logic um auth providers zu starten
  // eslint-disable-next-line @typescript-eslint/naming-convention
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Einrichten von Benutzerdaten bei Anmeldung mit Benutzername/Passwort,
  Anmelden mit Benutzername/Passwort und anmelden mit sozialer Auth Provider in der Firestoredatabase mit dem Dienst AngularFirestore + AngularFirestoreDocument */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Ausloggen
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
