# Idle Microbes beta signup page

Public page: https://formalizedchaos.com/idle-microbes/beta/

This static page links to the Play-compatible Google Group
`idle-microbes-play-beta@googlegroups.com`. Google Groups handles signup,
email delivery preferences and unsubscribe. The website has no signup backend,
subscriber data, analytics script or third-party asset dependencies.

## Group configuration

Public signup link:
https://groups.google.com/g/idle-microbes-play-beta/about

Use the public About page for the signup button. It shows the description,
joining button and group permissions to nonmembers. The Conversations page
shows a permission message to nonmembers because conversations are private.

Play Console rejected the earlier Workspace address even after the Play account
joined it. The Workspace list remains intact. The public page now uses a new
consumer Google Group that Play Console accepted and saved for closed Alpha.
Existing Workspace subscribers must join the new group to gain eligibility.
This group has these settings:

- Group visibility: anyone on the web.
- Joining: anyone on the web can join.
- External members: allowed.
- Posting: group owners and managers.
- Member list and email addresses: group owners and managers.
- Conversations: group members.
- Membership and group administration: group owners and managers.

The group's public About page was inspected on 2026-10-06. It reports anyone
on the web can join, owners and managers can view members and post, and members
can view conversations. The current browser account owns this new group, so a
nonowner join and email-delivery test remain unverified. The earlier Workspace
group's outside-account join dialog was checked before changing the destination.

## Publishing and checks

GitHub Pages publishes the repository's main branch at its root. No build
step is required. The homepage links to this page in the project list.

Preview the repository with a local static HTTP server. Check desktop and
phone-sized layouts, anchor navigation, images, privacy-policy links and the
Google Groups join dialog before changing the signup destination.

The Earth artwork and icon are copied from the Idle Microbes Play store
assets. Keep this page focused on the game's Earth content.

Closed Alpha version 0.9.4 (34), the tester group, 173 countries and the Earth
store listing were sent for review on 2026-10-06. Console subsequently showed
the app in closed testing and the dashboard marked the closed release published.
The page includes the track's observed opt-in URL:
https://play.google.com/apps/testing/com.formalizedchaos.idlemicrobes

## Free app update

On 2026-10-06 the owner requested changing the Google Play app to free and
removing the promo-code signup instructions. The owner accepts a public legal
name and authorized the permanent price change before confirming full-address
removal. The price was saved on 2026-10-06. Console confirms the app is available
for free and cannot be changed back to paid. The page uses the free install flow.

Group membership provides eligibility; each tester must separately opt in with
the same Google account before installing. A free app requires no promo code
or support-email request. The page retains the age, country, internal-test and
installation-channel requirements. A nonowner opt-in and installation remain
unverified.

The earlier paid-app campaign 131314822 and its private code list are preserved.
Codes and tester identities stay out of this public repository.

Google still requires the legal name of a personal developer account to be shown.
Changing the app to free does not promise removal of account identity disclosures.
The first public-listing check after the price change showed Install and still
showed the full address under About the developer. Address removal remains open.

Google references:
- https://support.google.com/googleplay/android-developer/answer/9845334
- https://support.google.com/googleplay/android-developer/answer/6334373
- https://support.google.com/googleplay/android-developer/answer/13628312
