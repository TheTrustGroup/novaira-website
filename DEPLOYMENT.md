# Deployment Guide

## ✅ Pre-Deployment Checklist

- [x] Build test passed (`npm run build`)
- [x] All changes committed and pushed to GitHub
- [x] No TypeScript errors
- [x] No build warnings
- [x] Metadata properly configured

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications with automatic optimizations.

#### Quick Deploy:
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import repository: `TheTrustGroup/novaira-website`
5. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. Click "Deploy"

#### Environment Variables (if needed):
- None required for this project

#### Custom Domain: `novairaworld.com`

**Step-by-Step Domain Setup:**

1. **Add Domain in Vercel:**
   - Go to your project settings in Vercel dashboard
   - Navigate to **Settings** → **Domains**
   - Click **Add Domain**
   - Enter: `novairaworld.com`
   - Click **Add**

2. **Configure DNS Records:**
   Vercel will provide you with DNS records. Add these to your domain registrar:

   **⚠️ Important:** Most registrars DO NOT support CNAME at the apex (root domain). Use A records for the root domain.

   **For Apex Domain (novairaworld.com):**
   - Type: `A`
   - Name: `@` (or leave blank for root domain)
   - Value: `76.76.21.21` (Vercel's IP - verify exact IPs in dashboard)
   - **Note:** Vercel may provide multiple A record IPs - add ALL of them
   - **Do NOT use CNAME** for the root domain unless your registrar specifically supports it (like Cloudflare)

   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com` (verify exact value in Vercel dashboard)
   - This is safe to use CNAME for subdomains

3. **Wait for DNS Propagation:**
   - DNS changes can take 24-48 hours to propagate
   - Vercel will show domain status in the dashboard
   - Status will change from "Pending" to "Valid Configuration"

4. **SSL Certificate:**
   - SSL certificates are automatically provisioned by Vercel
   - HTTPS will be enabled automatically once DNS is configured

5. **Verify Domain:**
   - Visit `https://novairaworld.com` after DNS propagation
   - Check that the site loads correctly
   - Verify SSL certificate is active (padlock icon in browser)

### Option 2: Netlify

1. Visit [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "New site from Git"
4. Select repository: `TheTrustGroup/novaira-website`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

#### Custom Domain: `novairaworld.com`

**Step-by-Step Domain Setup:**

1. **Add Domain in Netlify:**
   - Go to **Site settings** → **Domain management**
   - Click **Add custom domain**
   - Enter: `novairaworld.com`
   - Click **Verify**

2. **Configure DNS Records:**
   Netlify will provide DNS records. Add these to your domain registrar:

   **⚠️ Important:** Most registrars DO NOT support CNAME at the apex (root domain). Use A records for the root domain.

   **For apex domain (novairaworld.com):**
   - Type: `A`
   - Name: `@` (or leave blank for root domain)
   - Value: `75.2.60.5` (verify exact IP in Netlify dashboard)
   - **Do NOT use CNAME** for the root domain unless your registrar specifically supports it
   
   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `novairaworld.com` (or Netlify's provided value - verify in dashboard)
   - This is safe to use CNAME for subdomains

3. **Wait for DNS Propagation:**
   - DNS changes can take 24-48 hours
   - Netlify will show domain status in dashboard
   - Status will change to "Active" when ready

4. **SSL Certificate:**
   - Netlify automatically provisions Let's Encrypt SSL certificates
   - HTTPS will be enabled automatically

5. **Verify Domain:**
   - Visit `https://novairaworld.com` after DNS propagation
   - Check that the site loads correctly

### Option 3: Self-Hosted

#### Build for Production:
```bash
npm run build
npm start
```

#### Using PM2:
```bash
npm install -g pm2
pm2 start npm --name "novaira" -- start
pm2 save
pm2 startup
```

## 📊 Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    49.2 kB         136 kB
└ ○ /_not-found                          142 B          87.4 kB
+ First Load JS shared by all            87.2 kB
```

## 🔍 Post-Deployment Checklist

- [ ] Test homepage loads correctly
- [ ] Verify all animations work smoothly
- [ ] Test mobile navigation menu
- [ ] Verify lightbox gallery functionality
- [ ] Test consultation modal form
- [ ] Check all links and navigation
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Verify SEO metadata
- [ ] Check performance (Lighthouse score)

## 🎯 Performance Targets

- Lighthouse Performance: 90+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

## 📝 Notes

- The site is fully static and optimized for fast loading
- All images should be optimized before adding to `/public/images/`
- Video file (`novaira-hero-video.mp4`) should be optimized for web
- Consider using Next.js Image component for better optimization

## 🔄 Continuous Deployment

If connected to Vercel/Netlify:
- Every push to `main` branch automatically triggers deployment
- Preview deployments are created for pull requests

## 🌐 Domain Setup Quick Reference

**Domain:** `novairaworld.com`

**Current Configuration:**
- ✅ Domain updated in `app/layout.tsx` metadata
- ✅ Email updated to `office@novairaworld.com`
- ⏳ DNS records need to be configured at your domain registrar
- ⏳ Domain needs to be added in deployment platform (Vercel/Netlify)

**Common Domain Registrars:**
- GoDaddy: https://www.godaddy.com
- Namecheap: https://www.namecheap.com
- Google Domains: https://domains.google
- Cloudflare: https://www.cloudflare.com

**Important Notes:**
- Always use the exact DNS values provided by your deployment platform
- DNS propagation can take 24-48 hours (usually faster, 1-4 hours)
- You can check DNS propagation status at: https://www.whatsmydns.net
- Both `novairaworld.com` and `www.novairaworld.com` should work after setup

## 🐛 Troubleshooting

### Build Errors:
- Ensure all dependencies are installed: `npm install`
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

### Deployment Issues:
- Check build logs in deployment platform
- Verify Node.js version (requires 18+)
- Ensure environment variables are set if needed

### Domain Issues:

**Domain not resolving:**
- Verify DNS records are correctly added at your registrar
- Check DNS propagation status (can take up to 48 hours)
- Ensure you're using the exact values provided by Vercel/Netlify
- Clear your browser cache and try again

**SSL Certificate not working:**
- Wait for DNS to fully propagate (24-48 hours)
- Verify domain is properly configured in deployment platform
- Check that both apex and www records are configured correctly

**Domain shows "Invalid Configuration":**
- Double-check DNS records match exactly what Vercel/Netlify provided
- Ensure no conflicting DNS records exist
- Wait for DNS propagation to complete
- Contact your domain registrar if issues persist

**CNAME Conflicts (Common Issue):**

CNAME conflicts occur when:
1. You have both A and CNAME records for the same name
2. Multiple CNAME records exist for the same subdomain
3. Your registrar doesn't support CNAME at apex (root domain)
4. Existing DNS records conflict with new ones

**How to Resolve CNAME Conflicts:**

**For Apex Domain (novairaworld.com):**

❌ **Problem:** Many registrars don't allow CNAME at the root domain (apex)

✅ **Solution - Use A Records Instead:**
- **Remove** any existing CNAME record for `@` or blank name
- **Remove** any conflicting A records
- **Add** A record(s) with the IP address(es) provided by your deployment platform:
  - **Vercel:** Use the A record IP addresses shown in your Vercel dashboard (usually multiple IPs)
  - **Netlify:** Use `75.2.60.5` (verify in Netlify dashboard)
- **Keep** CNAME for `www` subdomain only

**Step-by-Step Fix:**

1. **Check Current DNS Records:**
   - Log into your domain registrar
   - Go to DNS Management / DNS Settings
   - List all existing records for `novairaworld.com`

2. **Remove Conflicting Records:**
   - Delete any CNAME record with name `@` or blank
   - Delete any old A records pointing to different IPs
   - Delete duplicate CNAME records

3. **Add Correct Records:**

   **For Vercel:**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 76.76.21.21 (verify exact IP in Vercel dashboard)
   TTL: 3600 (or default)
   
   Type: A
   Name: @ (or leave blank)
   Value: 76.223.126.88 (Vercel may provide multiple IPs - add all)
   TTL: 3600
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com (verify exact value in dashboard)
   TTL: 3600
   ```

   **For Netlify:**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 75.2.60.5 (verify exact IP in Netlify dashboard)
   TTL: 3600
   
   Type: CNAME
   Name: www
   Value: novairaworld.com (or Netlify's provided value)
   TTL: 3600
   ```

4. **Alternative: Use Cloudflare (If Your Registrar Doesn't Support Apex CNAME):**
   - Transfer DNS management to Cloudflare (free)
   - Cloudflare supports CNAME flattening (ALIAS records)
   - This allows CNAME-like behavior at the apex domain

5. **Verify:**
   - Wait 15-30 minutes for DNS changes to propagate
   - Check DNS propagation: https://www.whatsmydns.net
   - Verify in your deployment platform dashboard that domain status changes to "Valid"

**Common Registrar-Specific Notes:**

- **GoDaddy:** Use A records for apex, CNAME for www
- **Namecheap:** Use A records for apex, CNAME for www
- **Cloudflare:** Supports CNAME flattening (can use CNAME at apex)
- **Google Domains:** Use A records for apex, CNAME for www
- **Route 53 (AWS):** Supports ALIAS records (similar to CNAME at apex)

**Redirects (www vs non-www):**
- Vercel/Netlify can automatically redirect www to non-www (or vice versa)
- Configure this in your deployment platform's domain settings
- Recommended: Redirect `www.novairaworld.com` → `novairaworld.com`
