type TUserData = {
  email: string;
  name: string;
};
const alpha = 'abcdefghijklmnopqrstuvwxyz';
const linkLength = 9;
const linkInterval = 3;
function genLink(): string {
  let link = '';
  for (let i = 0; i < linkLength; i++) {
    if (i <= linkLength && i % linkInterval == 0 && i > linkInterval - 1) {
      link += '-';
    }
    link += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return link;
}

export function createLink(): string {
  return genLink();
}

export function addUser(userData: TUserData, users: Map<string, TUserData>) {
  const link = genLink();
  if (!users.has(link)) {
    users.set(link, userData);
  }
}
