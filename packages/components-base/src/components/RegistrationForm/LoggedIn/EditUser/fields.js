import localization from '@univision/fe-utilities/localization';

export default [
  {
    id: 'edit-profile-username',
    key: 'edit-profile-username',
    label: localization.get('name'),
    type: 'text',
  },
  {
    id: 'edit-profile-email',
    key: 'edit-profile-email',
    label: localization.get('mail'),
    type: 'email',
  },
  {
    id: 'edit-profile-password',
    key: 'edit-profile-password',
    label: localization.get('password'),
    type: 'password',
  },
  {
    id: 'edit-profile-password-confirm',
    key: 'edit-profile-password-confirm',
    label: localization.get('confirmPassword'),
    type: 'password',
  },
];
