package com.bbsoftware.SportClub.event;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

public class EventSerializer extends StdSerializer<Event> {
    public EventSerializer(){
        this(null);
    }
    public EventSerializer(Class<Event> t){
        super(t);
    }
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
    @Override
    public void serialize(Event value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException{
        String formattedStartDate = dateFormat.format(value.getDateStart());
        String formattedEndDate = dateFormat.format(value.getDateEnd());

        jgen.writeStartObject();
        jgen.writeNumberField("id",value.getId());
        jgen.writeStringField("title",value.getMessage());
        jgen.writeStringField("start",formattedStartDate);
        jgen.writeStringField("end",formattedEndDate);
        jgen.writeEndObject();
    }

}
