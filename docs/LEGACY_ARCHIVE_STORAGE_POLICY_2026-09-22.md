# Legacy archive storage policy — 2026-09-22

The preserved SiteCraft archive in `falke0039/wystynez` is the canonical storage location for original legacy HTML, images, downloads and SiteCraft assets.

Do not duplicate the complete archive, `sc-pic`, or `download` trees in this repository. The modern repository should contain the public application, structured migrated content, and lightweight provenance pointers to the preserved source.

Migration rules:
- read original HTML and asset relationships from `falke0039/wystynez`;
- record source repository, source path and legacy URL for migrated material;
- migrate structured article text into the modern data model;
- do not copy archival binaries merely for backup/storage;
- do not modify the preserved archive during ordinary migration;
- modernization of the old archive is a separate workstream in Alexey's repository.

This policy keeps the large historical archive in Alexey's repository and prevents unnecessary storage growth in `Yumis84/vishtynets-eco-museum`.
