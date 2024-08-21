package com.example.Stocker.Service;

import com.example.Stocker.Exception.FileStorageException;
import com.example.Stocker.ImageUtil;
import com.example.Stocker.Repository.UserRepository;
import com.example.Stocker.model.User;
import com.fasterxml.jackson.annotation.SimpleObjectIdResolver;
import com.fasterxml.jackson.databind.util.NativeImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;


@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    public  void saveUser(String username, String email,String password,String  image) throws IOException {
        try{
            //create the user
            User user = User.builder()
                    .username(username)
                    .email(email)
                    .password(password)
                    .image(image)
                    .build();
            userRepository.save(user);
        }catch (Exception e ){
            e.printStackTrace();
        }

    }
    //convert the multipart image file to blob
    public static Blob multipartFileToBlob(MultipartFile multipartFile) throws IOException, SQLException {
        return new javax.sql.rowset.serial.SerialBlob(multipartFile.getBytes());
    }

    public List<User> getAllusers() {
        return userRepository.findAll();
    }

    public User getuser(String email) {
        return userRepository.findByEmail(email);
    }

    public User authenticate(User user) {
       return  user = userRepository.findByEmail(user.getEmail());
//        System.out.println("user"+userDb);
//        if (userDb!=null){
//            System.out.println("There is a user with this email");
//            if(user.getPassword().equals(userDb.getPassword())){
//                return  userDb;
//            }
//        }
//
//      return   user;
    }
   // public String uploadDir ="C:\\Users\\Learner_9ZH3Z187\\IdeaProjects\\capstone\\Stocker\\frontend\\public\\images";

    public String uploadFile(MultipartFile file){

//        try {
//            Path copyLocation = Paths.get(uploadDir + File.separator + StringUtils.cleanPath(file.getOriginalFilename()));
//            Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
//            String fileName = file.getOriginalFilename();
//            int filelength = file.getBytes().length;
//            System.out.println("File uploaded successfully, " + "file name is :: "+ fileName + " and length is ::" + filelength+"pat::h"+copyLocation.getFileName().toString());
//            return copyLocation.getFileName().toString();
//        }
        try{
            String fileName =  file.getOriginalFilename();
            System.out.println("fileName:"+fileName);
            //    @Value("${image.upload.dir}")
            String uploadDir = "/app/public/images";
            String filePath = uploadDir + File.separator + fileName;
            System.out.println("filePath: "+filePath);

            File destinationFile = new File(filePath);
            System.out.println("Destinationfile"+destinationFile);
            file.transferTo(destinationFile);
            System.out.println("File uploaded successfully, " + "file name is :: "+ fileName + " and path is ::"+filePath+"Destination is "+destinationFile );
            return  fileName;
        }
        catch (IOException e){
            e.printStackTrace();
            throw new FileStorageException("File not Found");
        }
    }
}
