package org.dit.wim.ase.footprint.service;

import lombok.extern.log4j.Log4j2;
import org.dit.wim.ase.footprint.DTO.AnswerDTO;
import org.dit.wim.ase.footprint.DTO.AnswerSetDTO;
import org.dit.wim.ase.footprint.entity.Answermodel;
import org.dit.wim.ase.footprint.entity.Transportmodel;
import org.dit.wim.ase.footprint.entity.UserProperty;
import org.dit.wim.ase.footprint.model.AnswerResponse;
import org.dit.wim.ase.footprint.repo.AnswerRepository;
import org.dit.wim.ase.footprint.repo.TransportRepository;
import org.dit.wim.ase.footprint.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@Log4j2
public class AnswerserviceImpl implements AnswerService{

    private final AnswerRepository answerRepository;

    private final TransportRepository transportRepository;

    private final UserRepository userRepository;

    public AnswerserviceImpl(AnswerRepository answerRepository, TransportRepository transportRepository, UserRepository userRepository) {
        this.answerRepository = answerRepository;
        this.transportRepository = transportRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<AnswerResponse> getAllAnswers() {
        log.info("Fetching All Answers");
        List<Answermodel> answerModelList = answerRepository.findAll();
        List<AnswerResponse> answerResponseList =answerModelList.stream()
                .map(this::convertToAnswerResponse)
                .collect(Collectors.toList());
        log.info("Fetched ALl Answers");
        return answerResponseList;
    }

    @Override
    public List<AnswerDTO> getAllAnswersExtra() {
        log.info("Fetching All Answers with extra");
        List<Answermodel> answerModelList = answerRepository.findAll();
        List<AnswerDTO> answerDtoList =answerModelList.stream()
                .map(this::convertToAnswerDTO)
                .collect(Collectors.toList());
        log.info("Fetched ALl Answers with extra");
        return answerDtoList;
    }

    @Override
    public Map<String, String> setAnswer(AnswerSetDTO answerDTO) {
        log.info("Saving a new answer...");

        try {
            //
            Transportmodel transport = transportRepository.findById(answerDTO.getTransportid())
                    .orElseThrow(() -> new RuntimeException("Transport not found with ID: " + answerDTO.getTransportid()));

            //
            UserProperty user = userRepository.findById(answerDTO.getUserid())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + answerDTO.getUserid()));

            //
            Answermodel answer = Answermodel.builder()
                    .Date(answerDTO.getDate())
                    .Time(answerDTO.getTime())
                    .Distance(answerDTO.getDistance())
                    .Passenger_count(answerDTO.getPassenger_count())
                    .Transportmodel(transport)  //
                    .userproperty(user)         //
                    .build();

            //
            Answermodel savedAnswer = answerRepository.save(answer);

            log.info("Answer saved successfully with ID: " + savedAnswer.getAnswer_id());

            return Map.of(
                    "message", "Answer saved successfully",
                    "answer_id", String.valueOf(savedAnswer.getAnswer_id()) //
            );

        } catch (Exception e) {
            log.error("Error saving answer: " + e.getMessage());
            return Map.of("error", "Failed to save answer: " + e.getMessage());
        }
    }



    @Override
    public void deleteAnswer(Integer id) {
        if (!answerRepository.existsById(id)) {
            throw new RuntimeException("Answer with ID " + id + " not found.");
        }
        answerRepository.deleteById(id);
    }


    private AnswerResponse convertToAnswerResponse(Answermodel answerModel){
        return AnswerResponse.builder()
                .Answer_id(answerModel.getAnswer_id())
                .Date(answerModel.getDate())
                .Time(answerModel.getTime())
                .Distance(answerModel.getDistance())
                .Passenger_count(answerModel.getPassenger_count())
                .build();
    }
    private AnswerDTO convertToAnswerDTO(Answermodel answerModel){
        String transportMethodName = (answerModel.getTransportmodel() != null) ? answerModel.getTransportmodel().getTransportname() : "Unknown TransportName";
        String userName = (answerModel.getUserproperty() != null) ? answerModel.getUserproperty().getUsername() : "Unknown Username";
        return AnswerDTO.builder()
                .id(answerModel.getAnswer_id())
                .Date(answerModel.getDate())
                .Time(answerModel.getTime())
                .Distance(answerModel.getDistance())
                .Passenger_count(answerModel.getPassenger_count())
                .TransportMethodName(transportMethodName)
                .UserName(userName)
                .build();
    }
}
