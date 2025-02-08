package org.dit.wim.ase.footprint.service;

import org.dit.wim.ase.footprint.DTO.AnswerDTO;
import org.dit.wim.ase.footprint.DTO.AnswerSetDTO;
import org.dit.wim.ase.footprint.entity.Answermodel;
import org.dit.wim.ase.footprint.model.AnswerResponse;

import java.util.List;
import java.util.Map;

public interface AnswerService {
    List<AnswerResponse> getAllAnswers();
    List<AnswerDTO> getAllAnswersExtra();
    public Map<String, String> setAnswer(AnswerSetDTO answerDTO);
    void deleteAnswer(Integer id);
}
