/**
 * Simple LinkedIn integration helper.
 * Uses the LinkedIn REST API (v2) to fetch basic profile data.
 * The function expects a valid OAuth2 access token with the
 * `r_liteprofile` and `r_emailaddress` scopes.
 */
export async function fetchLinkedInProfile(accessToken: string) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Cache-Control': 'no-cache',
    };

    // Basic profile (id, firstName, lastName, profilePicture)
    const profileRes = await fetch('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
        headers,
    });
    if (!profileRes.ok) {
        throw new Error('Failed to fetch LinkedIn profile');
    }
    const profile = await profileRes.json();

    // Email address
    const emailRes = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        headers,
    });
    const emailData = emailRes.ok ? await emailRes.json() : null;
    const email = emailData?.elements?.[0]?.['handle~']?.emailAddress || '';

    // Extract name
    const firstName = profile.firstName?.localized?.en_US || '';
    const lastName = profile.lastName?.localized?.en_US || '';

    // Extract avatar URL if available
    let avatar = '';
    try {
        const displayImage = profile.profilePicture?.['displayImage~']?.elements?.[0];
        avatar = displayImage?.identifiers?.[0]?.identifier || '';
    } catch (_) { }

    return {
        id: profile.id,
        firstName,
        lastName,
        email,
        avatar,
    };
}
