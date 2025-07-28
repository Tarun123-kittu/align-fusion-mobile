# Align Fusion React Native Template

## Features

- Expo + React Native + TypeScript
- File-based routing with Expo Router
- 5-tab bottom navigation (Home, Challenges, Scanner, Rewards, Profile)
- Authentication flow: Login, Forgot Password, Create New Password, Reset Password
- Custom Header component (profile, greeting, notification)
- Common reusable Modal component
- Centralized color constants (primary, secondary, green)

## Structure

```
components/
  - CommonModal.tsx
  - Header.tsx
constants/
  - Colors.ts
app/
  - _layout.tsx (root navigation)
  - LoginScreen.tsx
  - ForgotPasswordScreen.tsx
  - CreateNewPasswordScreen.tsx
  - ResetPasswordScreen.tsx
  - (tabs)/
      - _layout.tsx (tab navigation)
      - home.tsx
      - challenges.tsx
      - scanner.tsx
      - rewards.tsx
      - profile.tsx
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npx expo start
   ```

## Customization
- Update color palette in `constants/Colors.ts`.
- Add your authentication logic in `app/_layout.tsx`.
- Replace placeholder screens with your UI.
- Use `CommonModal` for custom modals with close button.
