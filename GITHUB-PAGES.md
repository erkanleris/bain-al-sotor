# دعم GitHub Pages — بين السطور

هذه النسخة تحتوي على Workflow جاهز للنشر التلقائي على **GitHub Pages** عند الدفع إلى فرع `main`. يتم بناء الواجهة باستخدام Vite ثم رفع مجلد `dist/public` إلى Pages.

## التشغيل المحلي

```bash
pnpm install
pnpm dev
```

## البناء للإنتاج

```bash
pnpm check
pnpm build
```

## النشر على GitHub Pages

بعد رفع المشروع إلى مستودع باسم `bain-al-sotor`، فعّل Pages من إعدادات المستودع عبر اختيار **GitHub Actions** كمصدر النشر. بعد ذلك يكفي تنفيذ:

```bash
git add .
git commit -m "Update Bain Al Sotor logo and Pages support"
git push origin main
```

يستخدم Workflow المتغير `VITE_BASE_PATH=/bain-al-sotor/`، لذلك تُبنى روابط React والصور بشكل مناسب لمسار المستودع. إذا تغيّر اسم المستودع، غيّر قيمة `VITE_BASE_PATH` في `.github/workflows/deploy-pages.yml` إلى اسم المستودع الجديد.

## الأصول

يوجد الشعار المرفق في `github-assets/bain-al-sotor-logo.png` بصيغته الأصلية، ويُستخدم في الشريط العلوي، شاشة التعريف، شاشة الفوز، والفافيكون. كما توجد الأصول البصرية المساعدة في المجلد نفسه، بينما يحتفظ تشغيل Manus بروابط التخزين الخاصة به تلقائيا.

## ملاحظة عن النشر

الموقع الحالي واجهة أمامية ثابتة، لذلك تعمل إعدادات اللعبة والتفاعل داخل المتصفح فقط. لا توجد حاليا قاعدة بيانات أو مزامنة بين أجهزة اللاعبين؛ يمكن إضافة ذلك لاحقا عبر Backend أو خدمة غرف لعب.
