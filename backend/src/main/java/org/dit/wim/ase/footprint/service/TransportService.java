package org.dit.wim.ase.footprint.service;

import org.dit.wim.ase.footprint.entity.Transportmodel;
import org.dit.wim.ase.footprint.model.TransportResponse;

import java.util.List;
import java.util.Map;

public interface TransportService {
    List<TransportResponse> getAllTransportmethod();
    TransportResponse getTransportmethodById(Integer  T_Id);
    Map<String, String> deleteTransport(Integer T_Id);
    Map<String, String> deleteTransportCascade(Integer T_Id);
    Map<String, String> deleteTransportAndKeepAnswers(Integer T_Id);
    public Map<String, String> setMethod(TransportResponse transportResponse);

}
