
```bash
# brew install mkcert
mkcert oldsanjuan 10.0.1.198 oldsanjuan.local 127.0.0.1 ::1
mkcert santiam24  10.0.0.7   santiam24.local  127.0.0.1 ::1

# creates PRIVATE KEY
#   --ssl-key [KEY]  X.509 (SSL) Private Key.
# -rw-------   1 roblabs  staff  1704 Feb 17 08:18 localhost+4-key.pem      # -----BEGIN PRIVATE KEY-----

# creates CERTIFICATE
#   --ssl-cert [CERT]  X.509 (SSL) certificate.
# -rw-r--r--   1 roblabs  staff  1606 Feb 17 08:18 localhost+4.pem          # -----BEGIN CERTIFICATE-----
```