// Recipient blood group -> Compatible donor blood groups
export const COMPATIBLE_DONORS = {
    "O-": ["O-"],
    "O+": ["O-", "O+"],
    "A-": ["O-", "A-"],
    "A+": ["O-", "O+", "A-", "A+"],
    "B-": ["O-", "B-"],
    "B+": ["O-", "O+", "B-", "B+"],
    "AB-": ["O-", "A-", "B-", "AB-"],
    "AB+": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  };
  
  export function canDonateTo(donorGroup, recipientGroup) {
    if (!donorGroup || !recipientGroup) return false;
    const allowed = COMPATIBLE_DONORS[recipientGroup] || [];
    return allowed.includes(donorGroup);
  }
  
  export function isDonorEligible(lastDonationDate) {
    if (!lastDonationDate) return { eligible: true, daysRemaining: 0 };
    const last = new Date(lastDonationDate);
    const diffDays = Math.floor((Date.now() - last.getTime()) / (1000 * 60 * 60 * 24));
    const remaining = Math.max(0, 90 - diffDays);
    return {
      eligible: remaining === 0,
      daysRemaining: remaining,
    };
  }