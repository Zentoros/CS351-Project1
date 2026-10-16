export function validateAccount(v) {
  const e = {};
  if (!/^[A-Za-z][A-Za-z0-9_]{3,19}$/.test(v.username.trim())) e.username = 'Use 4–20 characters, start with a letter, and use only letters, numbers or underscores.';
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v.password)) e.password = 'Use at least 8 characters with an uppercase letter, lowercase letter and number.';
  if (v.confirm !== v.password || !v.confirm) e.confirm = 'Passwords must match.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  const address = ['street', 'city', 'state', 'zip'];
  const entered = address.some(k => v[k].trim());
  if (entered) {
    address.forEach(k => {
      if (!v[k].trim()) e[k] = 'Complete all four address fields, or leave all four empty.';
    });
    if (v.street.trim() && !/^(?=.*[A-Za-z])(?=.*\d).{5,100}$/.test(v.street.trim())) e.street = 'Enter a complete street address, such as 123 Main St.';
    if (v.city.trim() && !/^[A-Za-z .'-]{2,60}$/.test(v.city.trim())) e.city = 'Enter a valid city name.';
    if (v.state && !states.includes(v.state)) e.state = 'Choose a U.S. state.';
    if (v.zip && !/^\d{5}(-\d{4})?$/.test(v.zip)) e.zip = 'Use a 5-digit ZIP or ZIP+4.';
  }
  if (v.phone.trim() && !/^(\+1[ .-]?)?(\(\d{3}\)|\d{3})[ .-]?\d{3}[ .-]?\d{4}$/.test(v.phone.trim())) e.phone = 'Enter a valid U.S. phone number.';
  return e;
}
export const states = 'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC'.split(' ');
