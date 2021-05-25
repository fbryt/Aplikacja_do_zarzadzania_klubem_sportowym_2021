package com.bbsoftware.SportClub.email;

import com.bbsoftware.SportClub.event.Event;
import com.bbsoftware.SportClub.event.EventRepository;
import lombok.AllArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Component
@AllArgsConstructor
public class ScheduledEmail {

    private final EmailService emailService;
    private final EventRepository eventRepository;

    private static final Logger log= LoggerFactory.getLogger(ScheduledEmail.class);


    @Scheduled(cron="0 12 * * ?")
    public void sendEmails()
    {
        Date now=new Date();
        List<Event> lista=eventRepository.findAll();
        for(Event ev:lista)
        {
            Date date=ev.getDateStart();
            Date temp=new Date(date.getTime() - Duration.ofDays(1).toMillis());
            if(temp.before(now))
            {
                URL url = getClass().getResource("/templates/scheduledMail.html");
                String path = url.getPath();
                File input = new File(path);
                Document doc;
                if (input.exists()) {
                    try {
                        doc = Jsoup.parse(input, null);
                        doc.select("span.startdate").first().text(date.toString());
                        doc.select("span.enddate").first().text(ev.getDateEnd().toString());
                        doc.select("p.message").first().text(ev.getMessage());
                        String mail;
                        mail = doc.toString();
                        emailService.send("ss@wdasfasf.pl", mail, "Incoming event!");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        log.info("Emails sent!");
    }
}
