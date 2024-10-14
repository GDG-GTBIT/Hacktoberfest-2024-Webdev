FROM elastic/filebeat:8.15.1

COPY filebeat.yml /usr/share/filebeat/filebeat.yml

USER root
RUN chown -R root /usr/share/filebeat/
USER filebeat
