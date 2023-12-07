import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

export default [
  {
    id: 'recovery-profile-password',
    key: 'recovery-profile-password',
    label: localization.get('newPassword'),
    type: 'password',
  },
  {
    id: 'recovery-profile-password-verify',
    key: 'recovery-profile-password-verify',
    label: localization.get('newPasswordConfirm'),
    type: 'password',
  },
];
